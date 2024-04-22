import axios from "../utils/axios";

export async function getWarga() {
  const { data } = await axios.get("warga");
  return data;
}

export async function getWargaById(id: string) {
  const { data } = await axios.get(`warga/${id}`);
  return data;
}

export async function createWarga(credentials: {
  nama_kk: string;
  blok: string;
  jalan: string;
  jumlah_keluarga: number;
}) {
  await axios.post("warga", credentials);
}

export async function updateWarga(id: string, data: any) {
  const response = await axios.put(`warga/${id}`, data);
  return response;
}

export async function deleteWarga(id: string) {
  const response = await axios.delete(`warga/${id}`);
  return response;
}
