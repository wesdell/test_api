const checkAdminRole = (req, res, next) => {
  const { role } = req.userAuth
  if (role !== 'ADMIN_ROLE') return res.status(401).json({ msg: 'Unauthorized, just ADMIN can delete users.' })

  next()
}

module.exports = {
  checkAdminRole
}
