import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useAuthCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    // Obtén el token desde el almacenamiento local
    const token = localStorage.getItem('token');

    // Si el token no existe o ha expirado
    if (!token) {
      alert('Tu sesión ha expirado o no estás autenticado. Serás redirigido al inicio.');
      navigate('/'); // Redirige al home
    } else {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodifica el JWT
        const expirationTime = decodedToken.exp * 1000; // El tiempo de expiración del token en milisegundos

        if (Date.now() > expirationTime) {
          alert('Tu sesión ha expirado. Serás redirigido al inicio.');
          localStorage.removeItem('token'); // Borra el token si ha expirado
          navigate('/'); // Redirige al home
        }
      } catch (e) {
        // Si no es un JWT válido, elimina el token y redirige
        localStorage.removeItem('token');
        alert('Tu sesión ha expirado o el token es inválido. Serás redirigido al inicio.');
        navigate('/');
      }
    }
  }, [navigate]); // Ejecuta cada vez que el componente se monte

}

export default useAuthCheck;
