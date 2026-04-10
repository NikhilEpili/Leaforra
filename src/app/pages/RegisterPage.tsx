import { FormEvent, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Leaf, UserRound } from 'lucide-react';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';
import { getRegisteredUser, isValidEmail, isValidIndianPhone, loginUser, registerUser } from '../auth';

type LocationState = {
  from?: string;
};

export function RegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const existingUser = getRegisteredUser();

  const [isLoginMode, setIsLoginMode] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingUser) {
      const from = (location.state as LocationState | null)?.from;
      navigate(from || '/', { replace: true });
    }
  }, [existingUser, location.state, navigate]);

  if (existingUser) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError('');

    const cleanName = name.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = email.trim();
    const cleanPassword = password;

    let hasError = false;

    if (!isLoginMode) {
      if (!cleanName) {
        setNameError('Name is required.');
        hasError = true;
      } else {
        setNameError('');
      }

      if (!isValidIndianPhone(cleanPhone)) {
        setPhoneError('Enter a valid Indian mobile number with 10 digits.');
        hasError = true;
      } else {
        setPhoneError('');
      }
    } else {
      setNameError('');
      setPhoneError('');
    }

    if (!isValidEmail(cleanEmail)) {
      setEmailError('Enter a valid email address.');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (cleanPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (hasError) {
      return;
    }

    try {
      setIsSubmitting(true);

      if (isLoginMode) {
        await loginUser({
          email: cleanEmail,
          password: cleanPassword,
        });
      } else {
        await registerUser({
          name: cleanName,
          phone: cleanPhone,
          email: cleanEmail,
          password: cleanPassword,
        });
      }

      const from = (location.state as LocationState | null)?.from;
      navigate(from || '/', { replace: true });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to continue. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl shadow-[#1E3D2F]/15 border border-[#C8E6D4] p-8 md:p-10"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-6 h-6 text-[#3A7D57]" />
            <h1 className="text-3xl md:text-4xl font-display font-bold text-[#1E3D2F]">
              {isLoginMode ? 'Welcome Back' : 'Welcome to Leaforra'}
            </h1>
          </div>

          <p className="text-center text-[#6B7C6E] mb-8">
            {isLoginMode
              ? 'Sign in to access your dashboard, plants, and My Garden.'
              : 'Register once to access your dashboard, plant collection, and My Garden.'}
          </p>

          <div className="w-14 h-14 rounded-full bg-[#C8E6D4] flex items-center justify-center mx-auto mb-6">
            <UserRound className="w-7 h-7 text-[#1E3D2F]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginMode && (
              <>
                <FormInput
                  label="Name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  error={nameError}
                  required
                />

                <FormInput
                  label="Phone"
                  type="tel"
                  placeholder="10-digit Indian mobile number"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  error={phoneError}
                  required
                />
              </>
            )}

            <FormInput
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={emailError}
              required
            />

            <FormInput
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={passwordError}
              required
            />

            {submitError && (
              <p className="text-sm text-red-600">{submitError}</p>
            )}

            <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
              {isSubmitting ? 'Please wait...' : isLoginMode ? 'Login' : 'Register'}
            </Button>

            <button
              type="button"
              onClick={() => {
                setIsLoginMode((previous) => !previous);
                setNameError('');
                setPhoneError('');
                setEmailError('');
                setPasswordError('');
                setSubmitError('');
              }}
              className="w-full text-sm text-[#3A7D57] hover:text-[#1E3D2F]"
            >
              {isLoginMode
                ? "Don't have an account? Register"
                : 'Already registered? Login'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
