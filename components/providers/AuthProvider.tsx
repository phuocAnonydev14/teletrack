'use client';

import { authService } from '@/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { TokenEnum } from '@/common/enums/app.enum';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { LoginModal } from '@/components/auth/LoginModal';

interface AuthContextType {
  name: string;
  id: string;
  handleLogout: () => void;
  withAuth: (callback: () => any) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const searchParams = useSearchParams();
  const authId = searchParams.get('auth');
  const [user, setUser] = useState<{ name: string; id: string }>({ name: '', id: '' });
  const pathname = usePathname();
  const router = useRouter();
  const [openLogin, setOpenLogin] = useState(false);

  const handleLogin = async (authId: string) => {
    try {
      const res = await authService.login(authId);
      const decoded = jwtDecode<{ name: string; sub: string }>(res.data.data);
      setCookie(TokenEnum.ACCESS, res.data.data);
      const userData = { name: decoded.name, id: decoded.sub };
      setUser(userData);
      router.push(pathname, { scroll: true });
      toast.success('Login successful');
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  const handleGetCurrentUser = () => {
    const access = getCookie(TokenEnum.ACCESS);
    if (access) {
      const decoded = jwtDecode<{ name: string; sub: string }>(access);
      setUser({ name: decoded.name, id: decoded.sub });
    }
  };

  const handleLogout = () => {
    deleteCookie(TokenEnum.ACCESS);
    setUser({ name: '', id: '' });
    router.push('/', { scroll: true });
  };

  const withAuth = async (callback: () => any) => {
    if (user.name) {
      return callback();
    }
    setOpenLogin(true);
  };

  useEffect(() => {
    if (authId) {
      handleLogin(authId).finally();
    }
  }, [searchParams]);

  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...user, handleLogout, withAuth }}>
      {children}
      <LoginModal open={openLogin} onOpenChange={(open) => setOpenLogin(open)} />
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
