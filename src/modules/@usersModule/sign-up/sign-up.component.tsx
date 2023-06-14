import { Alert, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { registerUserAction, UserRegisterObj } from "../userReducer";
import './sign-up.css';

const SignUp = (props: any) => {
    const actionDispatcher = useAppDispatch();
    const {
        isRegistrationInProgress,
        isUserRegistered,
        errorMessage
    } = useAppSelector(state => state.userData);
    console.log(isRegistrationInProgress);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data: any) => {
        const userData: UserRegisterObj = {
            userName: `${data.firstName} ${data.lastName}`,
            email: data.email,
            password: data.password
        };
        actionDispatcher(registerUserAction(userData));
    }
    console.log();

    return (
        <div className="form-container">
            <div className="registration-form">
                {
                    errorMessage !== '' && (
                        <Alert variant="danger" dismissible>
                            {errorMessage}
                        </Alert>
                    )
                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label>First name</label>
                            <input type="text" className="form-control" placeholder="First name" {...register("firstName", { required: "First Name is Required" })} />
                            {errors?.firstName && (
                                <div className='error'>{errors?.firstName?.message?.toString()}</div>
                            )}
                        </div>
                        <div className="col-md-12 mb-3">
                            <label>Last name</label>
                            <input type="text" className="form-control" placeholder="Last name" {...register("lastName", { required: "Last Name is Required" })} />
                            {errors?.lastName && (
                                <div className='error'>{errors?.lastName?.message?.toString()}</div>
                            )}
                        </div>
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
                        <Button type='submit' >
                            {
                                isRegistrationInProgress ? (
                                    <>
                                        <Spinner animation="border" variant="primary" />
                                        <span>Registering</span>
                                    </>
                                ) : 'Register'
                            }

                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;