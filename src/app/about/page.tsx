import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 text-center">About Schoolgle</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Schoolgle was created to modernize and streamline educational institution management. 
            We provide tools for activity management, risk assessment, and issue tracking to help 
            schools operate more efficiently and effectively.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Management</CardTitle>
                <CardDescription>Track and manage school activities</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Our activity management system helps you organize, schedule, and track all school activities in one place.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>Identify and mitigate risks</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Comprehensive tools for risk assessment to ensure safety and compliance in all school activities.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Issue Tracker</CardTitle>
                <CardDescription>Log and resolve issues efficiently</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Our issue tracking system ensures that problems are logged, assigned, and resolved in a timely manner.</p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
            Schoolgle is developed by a dedicated team of education and technology specialists who understand the unique challenges faced by educational institutions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Sarah Johnson", role: "Education Specialist", image: "https://randomuser.me/api/portraits/women/1.jpg" },
              { name: "David Chen", role: "Lead Developer", image: "https://randomuser.me/api/portraits/men/2.jpg" },
              { name: "Maria Rodriguez", role: "UX Designer", image: "https://randomuser.me/api/portraits/women/3.jpg" }
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-medium">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Have questions or feedback? We'd love to hear from you.
          </p>
          <div className="mt-4">
            <p className="mb-2"><strong>Email:</strong> info@schoolgle.example.com</p>
            <p className="mb-2"><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Education Street, Learning City, ED 12345</p>
          </div>
        </section>
      </div>
    </div>
  );
}