import React from "react";
import Sidebar from "./Component/Sidebar";
function Department() {
  return (
    <div className="flex">
      
      <Sidebar />
      <div>
      <div>Department</div>
      <h1>http://localhost:8000/admin/alldepartment</h1>
      <h1>http://localhost:8000/admin/createdepartment</h1>
      </div>
    </div>
  );
}

export default Department;
