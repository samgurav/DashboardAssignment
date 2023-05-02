import axios from "axios";
import { MAIN_URL } from "./Url";

export function RegisterUser(data) {
  console.log(data);
  return axios.post(`${MAIN_URL}user/adduser`, data);
}

export function addSocialUser(data) {
  console.log("im add");
  return axios.post(`${MAIN_URL}user/socialuser`, data);
}
export function LoginData(data) {
  console.log("im add", data);
  return axios.post(`${MAIN_URL}user/login`, data);
}

export function AddCourse(data) {
  console.log("im add", data);
  return axios.post(`${MAIN_URL}course/addcourse`, data);
}

export function getTrainer(data) {
  console.log("im add", data);
  return axios.get(`${MAIN_URL}trainer/gettrainer`, data);
}
export function getCourse(data) {
  console.log("im add", data);
  return axios.get(`${MAIN_URL}course/getcourse`, data);
}
export function updateCourse(data) {
  console.log("im add", data);
  return axios.post(`${MAIN_URL}course/updatecourse`, data);
}
export function deleteCourse(data) {
  console.log("im add", data);
  return axios.post(`${MAIN_URL}course/deletecourse`, data);
}
export function deleteTrainer(data) {
  console.log("im add", data);
  return axios.post(`${MAIN_URL}trainer/deletetrainer`, data);
}
export function updateTrainer(data) {
  console.log("im add", data);
  return axios.post(`${MAIN_URL}trainer/updatetrainer`, data);
}
export function getIntern(data) {
  console.log("im add", data);
  return axios.get(`${MAIN_URL}intern/getintern`, data);
}
export function GetAssignedCourse(data) {
  console.log("im add", data);
  return axios.post(`${MAIN_URL}intern/getassignedcourses`, data);
}
export function AddLesson(data) {
  console.log("im add", data);
  return axios.post(`${MAIN_URL}course/addlesson`, data);
}
export function getLesson(data) {
  console.log("im add", data);
  return axios.post(`${MAIN_URL}course/getlesson`, data);
}
export function AddAssignment(data) {
  console.log("im add", data);
  return axios.post(`${MAIN_URL}course/addassignment`, data);
}
export function getAssignment(data) {
  console.log("im add", data);
  return axios.post(`${MAIN_URL}course/getassignment`, data);
}
export function GetUser(data) {
  console.log(data);
  return axios.post(`${MAIN_URL}user/getuser`, data);
}
export function UpdateProfilePic(data) {
  console.log(data);
  return axios.post(`${MAIN_URL}user/updatephoto`, data);
}
export function UpdateUser(data) {
  console.log(data);
  return axios.post(`${MAIN_URL}user/updateuser`, data);
}
export function RegisterUserForCourse(data) {
  console.log(data);
  return axios.post(`${MAIN_URL}payment/paymentcourse`, data);
}
export function RaiseQuery(data) {
  console.log(data);
  return axios.post(`${MAIN_URL}intern/raisequery`, data);
}
export function getsinglelesson(data) {
  console.log("im add", data);
  return axios.post(`${MAIN_URL}course/getsinglelesson`, data);
}
export function AddAnswer(data) {
  console.log("im add", data);
  return axios.post(`${MAIN_URL}course/addanswer`, data);
}
export function getregisteredstudent(data) {
  console.log("im add", data);
  return axios.post(`${MAIN_URL}intern/getregisteredstudent`, data);
}
