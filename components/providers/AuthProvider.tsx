'use client';

import { authService } from '@/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { TokenEnum } from '@/common/enums/app.enum';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface AuthContextType {
  name: string;
  id: string;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const searchParams = useSearchParams();
  const authId = searchParams.get('auth');
  const [user, setUser] = useState<{ name: string; id: string }>({ name: '', id: '' });
  const pathname = usePathname();
  const router = useRouter();

  const handleLogin = async (authId: string) => {
    try {
      const res = await authService.login(authId);
      const decoded = jwtDecode<{ name: string; sub: string }>(res.data.data);
      console.log(decoded.name);
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

  useEffect(() => {
    if (authId) {
      handleLogin(authId).finally();
    }
  }, [searchParams]);

  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  return <AuthContext.Provider value={{ ...user, handleLogout }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const data = useContext(AuthContext);
  return data;
};
