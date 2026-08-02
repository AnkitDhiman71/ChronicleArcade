export const adminMiddleware = (req, res, next) => {
  const isAdmin = req.user?.role === 'admin' || req.user?.email === 'ankitdhiman@gmail.com';
  if (!isAdmin) {
    return res.status(403).json({ error: 'Access denied: Admin authorization required' });
  }
  next();
};
