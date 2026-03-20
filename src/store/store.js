import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer:()=>{console.log("hello");
    }
});

export default store