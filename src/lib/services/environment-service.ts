import { createClient } from '@supabase/supabase-js';

export interface Environment {
  id: number;
  name: string;
  description: string;
  isTemplate: boolean;
  status: 'active' | 'inactive' | 'template' | 'uat' | 'production';
  version: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EnvironmentConfig {
  environmentId: number;
  key: string;
  value: any;
}

export interface SchemaVersion {
  id: number;
  environmentId: number;
  version: string;
  appliedAt: Date;
  scriptName: string;
  checksum: string;
  status: 'success' | 'failed' | 'pending';
  errorMessage?: string;
}

export class EnvironmentService {
  private static instance: EnvironmentService;
  private supabase;

  private constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  public static getInstance(): EnvironmentService {
    if (!EnvironmentService.instance) {
      EnvironmentService.instance = new EnvironmentService();
    }
    return EnvironmentService.instance;
  }

  async getEnvironments(): Promise<Environment[]> {
    const { data, error } = await this.supabase
      .from('environments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapToEnvironment);
  }

  async getEnvironment(id: number): Promise<Environment> {
    const { data, error } = await this.supabase
      .from('environments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return this.mapToEnvironment(data);
  }

  async getEnvironmentConfig(environmentId: number): Promise<EnvironmentConfig[]> {
    const { data, error } = await this.supabase
      .from('environment_config')
      .select('*')
      .eq('environment_id', environmentId);

    if (error) throw error;
    return data.map(this.mapToEnvironmentConfig);
  }

  async cloneEnvironment(
    sourceEnvId: number,
    newName: string,
    description: string
  ): Promise<number> {
    const { data, error } = await this.supabase
      .rpc('clone_environment', {
        source_env_id: sourceEnvId,
        new_env_name: newName,
        new_env_description: description,
      });

    if (error) throw error;
    return data;
  }

  async updateEnvironmentStatus(
    environmentId: number,
    status: Environment['status']
  ): Promise<Environment> {
    const { data, error } = await this.supabase
      .from('environments')
      .update({ status })
      .eq('id', environmentId)
      .select()
      .single();

    if (error) throw error;
    return this.mapToEnvironment(data);
  }

  async updateEnvironmentConfig(
    environmentId: number,
    key: string,
    value: any
  ): Promise<EnvironmentConfig> {
    const { data, error } = await this.supabase
      .from('environment_config')
      .upsert({
        environment_id: environmentId,
        key,
        value,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return this.mapToEnvironmentConfig(data);
  }

  async getSchemaVersions(environmentId: number): Promise<SchemaVersion[]> {
    const { data, error } = await this.supabase
      .from('schema_versions')
      .select('*')
      .eq('environment_id', environmentId)
      .order('applied_at', { ascending: false });

    if (error) throw error;
    return data.map(this.mapToSchemaVersion);
  }

  async createNewEnvironmentFromTemplate(
    name: string,
    description: string
  ): Promise<Environment> {
    // Get template environment
    const { data: template, error: templateError } = await this.supabase
      .from('environments')
      .select('id')
      .eq('is_template', true)
      .eq('name', 'template_base')
      .single();

    if (templateError) throw templateError;

    // Clone the template
    const newEnvId = await this.cloneEnvironment(template.id, name, description);

    // Get the new environment details
    return this.getEnvironment(newEnvId);
  }

  async getModuleConfiguration(environmentId: number, moduleName: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('environment_config')
      .select('value')
      .eq('environment_id', environmentId)
      .eq('key', 'default_modules')
      .single();

    if (error) throw error;

    const modules = data.value as any[];
    return modules.find(m => m.name === moduleName)?.config || null;
  }

  private mapToEnvironment(data: any): Environment {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      isTemplate: data.is_template,
      status: data.status,
      version: data.version,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  private mapToEnvironmentConfig(data: any): EnvironmentConfig {
    return {
      environmentId: data.environment_id,
      key: data.key,
      value: data.value,
    };
  }

  private mapToSchemaVersion(data: any): SchemaVersion {
    return {
      id: data.id,
      environmentId: data.environment_id,
      version: data.version,
      appliedAt: new Date(data.applied_at),
      scriptName: data.script_name,
      checksum: data.checksum,
      status: data.status,
      errorMessage: data.error_message,
    };
  }
}