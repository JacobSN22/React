import { Page } from "../../App/Layout/Layout";
import { useForm } from "react-hook-form";
import { useAuth } from "../../App/Auth/useAuth";

export const Login = () => {
  const { loggedIn, loginInfo, setLoggedIn, setLogOut } = useAuth(store => ({
    loggedIn: store.loggedIn,
    loginInfo: store.loginInfo,
    setLoggedIn: store.setLoggedIn,
    setLogOut: store.setLogOut
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (submitdata) => {
    const URL = "https://api.mediehuset.net/token";

    try {
      fetch(URL, {
        body: JSON.stringify(submitdata),
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
      .then(        
        data => {
          if(data.status === 'Ok') {
            sessionStorage.setItem("token", JSON.stringify(data))
            setLoggedIn()
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page title="Login" description="Her kan du logge ind på vores site">
      {!loggedIn && !loggedIn.username ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              id="username"
              placeholder="Indtast brugernavn" 
              {...register("username", { required: true })}
            />
            {errors.username && (
              <span>
                Du skal udfylde dit brugernavn!
              </span>
            )}
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Indtast adgangskode" 
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span>
                Du skal udfylde din adgangskode!
              </span>
            )}
          </div>
          <div>
            <button type="submit">
              Login
            </button>
            <button type="reset">
              Nulstil felter
            </button>
          </div>
        </form>
      ) : 
        <div>
          <p>Du er logget ind som <i>{loginInfo.username}</i></p>
          <button onClick={setLogOut}>Log ud</button>
        </div>
      }
    </Page>
  );
};
