// 部门和员工信息
class Dept {
  deptId: number = 0
  deptInfo: string = ''
  deptName: string = ''
  lastupdate: string = ''
}
class Employee {
  deptId: number = 0
  employeeId: number = 0
  employeeName: string = ''
  lastupdate: string = ''
  phone: string = ''
  dept: Dept = new Dept()
}
export { Dept as Dept, Employee as Employee }
