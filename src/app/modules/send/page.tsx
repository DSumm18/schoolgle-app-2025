import React from 'react'

export default function SENDModulePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">SEND Dashboard</h2>
        <div className="flex items-center space-x-2">
          {/* Add action buttons here */}
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold">Total Students</h3>
          <p className="text-2xl font-bold">245</p>
        </div>
        
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold">Active EHCPs</h3>
          <p className="text-2xl font-bold">82</p>
        </div>
        
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold">Pending Reviews</h3>
          <p className="text-2xl font-bold">12</p>
        </div>
        
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold">Support Staff</h3>
          <p className="text-2xl font-bold">18</p>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
          {/* Add recent updates list here */}
        </div>
        
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold mb-4">Upcoming Reviews</h3>
          {/* Add upcoming reviews list here */}
        </div>
      </div>
    </div>
  )
}