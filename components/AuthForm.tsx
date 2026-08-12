import { useState } from 'react';
import { useAuth } from '../lib/auth.tsx';
import { LogIn, UserPlus, X } from 'lucide-react';

type Props = {
  onClose?: () => void;
};

export function AuthForm({ onClose }: Props) {
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();
    const result = isLogin
      ? await signIn(normalizedEmail, password)
      : await signUp(normalizedEmail, password);

    setLoading(false);

    if (result.error) {
      setError(
        isLogin && result.error.message.toLowerCase().includes('invalid login credentials')
          ? 'Email này chưa được đăng ký hoặc mật khẩu chưa đúng. Hãy chọn “Đăng ký ngay” nếu đây là lần đầu sử dụng.'
          : result.error.message,
      );
    } else if (!isLogin) {
      setIsLogin(true);
      setPassword('');
      setError('Tài khoản đã được tạo. Hãy đăng nhập bằng mật khẩu vừa đăng ký.');
    } else {
      onClose?.();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden">
        <div className="bg-indigo-900 text-white p-5 flex items-start justify-between">
          <div>
            <h2 className="font-bold text-base flex items-center gap-2">
              {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
              {isLogin ? 'Đăng nhập' : 'Đăng ký tài khoản'}
            </h2>
            <p className="text-xs text-indigo-200 mt-0.5">
              {isLogin ? 'Dành cho Admin quản trị hệ thống' : 'Tạo tài khoản mới'}
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-indigo-300 hover:text-white transition-colors cursor-pointer ml-4 mt-0.5"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="admin@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              placeholder="Ít nhất 6 ký tự"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              className="w-full border border-slate-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
              <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl text-sm font-semibold shadow-xs transition cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? 'Đang xử lý...' : isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </button>

          <p className="text-center text-xs text-slate-500">
            {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-indigo-600 font-semibold hover:underline cursor-pointer"
            >
              {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
