import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAddress } from "../services/apiGeocoding";

const initialState = {
  username: "",
  loadingPosition: "loaded",
  position: "",
  address: "",
  error: "",
};

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function fetchAddress() {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
}

export const fetchPosition = createAsyncThunk(
  "users/fetchPosition",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    console.log(position, address);
    return { position, address };
  },
);
const userSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    setName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosition.pending, (state, action) => {
      state.loadingPosition = "loading";
    }),
      builder.addCase(fetchPosition.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
      }),
      builder.addCase(fetchPosition.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setName } = userSlice.actions;

export default userSlice.reducer;
