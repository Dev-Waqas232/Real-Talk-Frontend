import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<Inputs>();
  const [showPass, setShowPass] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
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
          <label htmlFor="">Email</label>
          <input
            type="email"
            className="input border bg-gray-50"
            {...(register("email"), { required: true })}
          />
        </div>
        <div className="form-control relative">
          <label htmlFor="">Password</label>
          <input
            type={showPass ? "text" : "password"}
            className="input border bg-gray-50"
            {...(register("password"), { required: true, minLength: 6 })}
          />
          <button
            onClick={() => setShowPass(!showPass)}
            className="absolute bottom-3 right-3 active:opacity-30 transition-all"
            type="button"
          >
            {showPass ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
          </button>
        </div>
        <button className="btn">Login</button>
        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary">
            Create Now
          </Link>
        </p>
      </form>
    </section>
  );
}
