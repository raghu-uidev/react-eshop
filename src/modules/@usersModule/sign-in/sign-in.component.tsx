import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../hooks";
import { LoginData, loginUserAction } from "../userReducer";
import './sign-in.css';

const SignIn = (props: any) => {

    //testuserreact@webla.com, start12345
   
    const actionDispatcher = useAppDispatch();
   
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = (data: any) => {
        actionDispatcher(loginUserAction(data));
    }

    return (
        <div className="form-container">
            <div className="login-form">
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label>Email</label>
                            <input type="text" className="form-control" placeholder="Email" {...register("email", { required: 'Email is Required', pattern: { value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, message: 'Invalid Email Pattern' } })} />
                            {errors?.email && (
                                <div className='error'>{errors?.email?.message?.toString()}</div>
                            )}
                        </div>
                        <div className="col-md-12 mb-3">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password"
                                {...register("password",
                                    {
                                        required: 'Password is required',
                                        validate: {
                                            checkForMinLength: (value: string) => value.length >= 6,
                                            checkForMaxLength: (value: string) => value.length <= 15
                                        }
                                    })}
                            />
                            {errors.password && errors.password.type === 'required' && (
                                <div className='error'>{errors?.password?.message?.toString()}</div>
                            )}
                            {errors.password && errors.password.type === 'checkForMinLength' && (
                                <div className='error'>Password must be more than or equal to 6 letters</div>
                            )}
                            {errors.password && errors.password.type === 'checkForMaxLength' && (
                                <div className='error'>Password must be less than or equal to 15 letters</div>
                            )}
                        </div>
                    </div>
                    <div className="form-row">
                        <Button type='submit' >Login</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn;