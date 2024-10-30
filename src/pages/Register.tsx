import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../features/auth/authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [showPass, setShowPass] = useState(false);
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      const response = await signup(data).unwrap();
      if (response.ok) {
        toast.success("Account Created");
        dispatch(
          setCredentials({
            user: response.data.user,
            token: response.data.token,
          })
        );
        navigate("/");
      }
    } catch (error: any) {
      if (error.status === 409) {
        toast.error(error.data.message);
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };

  return (
    <section className="w-full h-screen flex flex-col pt-20 items-center">
      <h2 className="text-primary font-secondary  leading-5 text-3xl font-bold">
        RealTalk
      </h2>
      <p className="font-primary text-gray-500">
        Real Conversations, Anytime, Anywhere
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:w-2/6 w-[90%] font-primary"
      >
        <div className="form-control">
          <label htmlFor="">Username</label>
          <input
            className="input border bg-gray-50"
            type="text"
            {...register("username", {
              required: true,
              minLength: {
                value: 5,
                message: "User must contain at least 5 characters",
              },
            })}
          />
        </div>
        <div className="form-control">
          <label htmlFor="">Email</label>
          <input
            type="email"
            className="input border bg-gray-50"
            {...register("email", { required: true })}
          />
        </div>
        <div className="form-control relative">
          <label htmlFor="">Password</label>
          <input
            type={showPass ? "text" : "password"}
            className="input border bg-gray-50"
            {...register("password", { required: true, minLength: 6 })}
          />
          <button
            onClick={() => setShowPass(!showPass)}
            className="absolute bottom-3 right-3 active:opacity-30 transition-all"
            type="button"
          >
            {showPass ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
          </button>
        </div>
        <button className="btn" disabled={isLoading}>
          {isLoading ? "Please wait..." : "Register"}
        </button>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login Now
          </Link>
        </p>
      </form>
    </section>
  );
}
