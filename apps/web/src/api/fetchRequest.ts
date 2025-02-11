import ky from "ky";

export const fetchRequest = ky.create({
	prefixUrl: import.meta.env.VITE_API_REQUST_URL,
});
