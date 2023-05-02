import logo from "./logo.svg";
import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import "./App.css";
// import Home from "./components/HomePage/Home";
// import Signup from "./components/Signup/Signup";
// import Login from "./components/Login/Login";

const Home = lazy(() => import("./components/HomePage/Home"));
const NavigationBar = lazy(() => import("./components/Navbar/NavigationBar"));
const Signup = lazy(() => import("./components/Signup/Signup"));
const Login = lazy(() => import("./components/Login/Login"));
const Admindashboard = lazy(() =>
  import("./components/AdminDashboard/Admindashboard")
);
const InternList = lazy(() =>
  import("./components/AdminDashboard/InternList/InternList")
);
const CourseDetails = lazy(() =>
  import("./components/AdminDashboard/CourseDetails/CourseDetails")
);
const TrainerDetails = lazy(() =>
  import("./components/AdminDashboard/TrainerDetails/TrainerDetails")
);
const TrainerDashboard = lazy(() =>
  import("./components/TrainerDashboard/TrainerDashboard")
);
const AssignedCourseDetails = lazy(() =>
  import("./components/TrainerDashboard/AssignedCourseDetails")
);
const InternDashboard = lazy(() =>
  import("./components/InternDashboard/InternDashboard")
);
const Profile = lazy(() => import("./components/Profile/Profile"));
const InternDetails = lazy(() =>
  import("./components/InternDashboard/InternDetails/InternDetails")
);
const CourseDetailPage = lazy(() =>
  import("./components/InternDashboard/InternDetails/CourseDetail")
);
const Querysection = lazy(() =>
  import("./components/InternDashboard/InternDetails/QuerySection")
);
const QueryPage = lazy(() =>
  import("./components/InternDashboard/InternDetails/QueryPage")
);
const PageNotFound = lazy(() => import("./components/PageNotFound"));
function App() {
  return (
    <div className="App">
      <Suspense
      // fallback={
      //   <div>
      //     <img src="./Images/loading.gif" />
      //   </div>
      // }
      >
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admindashboard" element={<Admindashboard />} />
            <Route path="/internlist" element={<InternList />} />
            <Route path="/coursedetails" element={<CourseDetails />} />
            <Route path="/trainerdetails" element={<TrainerDetails />} />
            <Route path="/trainerdashboard" element={<TrainerDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/interndashboard" element={<InternDashboard />} />
            <Route path="/coursedetail" element={<CourseDetailPage />} />
            <Route path="/querysection" element={<Querysection />} />
            <Route path="/querypage" element={<QueryPage />} />
            <Route path="/interndetails" element={<InternDetails />} />
            <Route path="*" element={<PageNotFound />} />

            <Route
              path="/assigncoursedetails"
              element={<AssignedCourseDetails />}
            />
          </Routes>

          {/* <Footer /> */}
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
