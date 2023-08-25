// 部门和员工信息
class Dept {
  deptId: number | null = null
  deptInfo: string = ''
  deptName: string = ''
  lastupdate: string | null = null
}

class Employee {
  deptId: number | null = null
  employeeId: number | null = null
  employeeName: string = ''
  lastupdate: string | null = null
  phone: string = ''
  dept: Dept | null = null
}

export { Dept as Dept, Employee as Employee }
