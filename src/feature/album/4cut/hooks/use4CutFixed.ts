import { EP } from '@/global/api/ep';
import { api } from '@/global/utils/api';
import { useMutation } from '@tanstack/react-query';

const fetchData = async () => {
  const res = await api.post({ path: EP.auth.logout() });
  return res.result;
};

interface Use4CutFixedProps {}

export function use4CutFixed() {
  const mutation = useMutation({ mutationFn: () => fetchData() });

  return mutation;
}
