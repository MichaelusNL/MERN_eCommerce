import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 12),
    isAdmin: true,
    onMailList: false,
  },
  {
    name: 'John Doe',
    email: 'John@example.com',
    password: bcrypt.hashSync('123456', 12),
    onMailList: false,
  },
  {
    name: 'Jane Doe',
    email: 'Jane@example.com',
    password: bcrypt.hashSync('123456', 12),
    onMailList: false,
  },
]

export default users
