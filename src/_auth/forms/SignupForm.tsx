import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  const {toast} = useToast(); 
  const {mutateAsync: createUserAccount, isPending: isCreatingUser} = useCreateUserAccount();
  const {mutateAsync: signInAccount, isPending: isSignedIn } = useSignInAccount();
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();
  const navigate = useNavigate();

  // 1. Define your form.
   const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // create the user
    const newUser = await createUserAccount(values)
    if(!newUser) {
      return toast({
          title: "Sign up failed. Please try again."
      })
    }
     const session = await signInAccount({
      email: values.email,
      password: values.password
     });

     if(!session) {
        return toast({title: 'Sign in falied. Please try again'})
     }
     
     const isLoggedIn = await checkAuthUser();

     if(isLoggedIn) {
      form.reset();
      navigate('/')
     } else {
      return toast({title: 'Sign up failed. Please try again.'})
     }
  }
  
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src='assets/images/logo.svg' alt='logo' />
        
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        
        <p className="text-light-3 small-medium md:base-regular mt-2"> To use this App enter your details</p>
      
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input type='text' className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>username</FormLabel>
                <FormControl>
                  <Input type='text' className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input type='email' className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input type='password' className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">{
            isCreatingUser? <div className="flex-center gap-2"><Loader /> Loading...</div>:
            'Sign up'
          }</Button>

          <p className="text-small-regular text-light-2 text-center mt-2">already have an account? <Link to='/sign-in' className="text-primary-500 text-small-semibold ml-1">Log in</Link></p>
        </form>

      </div>
    </Form>
  )
}

export default SignupForm
