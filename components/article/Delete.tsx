import { useRouter } from 'next/router';
import * as s from 'styles/components/Delete';

interface Props {
  articleid: string;
  fileRef: string | null;
}

export default function Delete({ articleid, fileRef }: Props) {
  const router = useRouter();

  const click$delete = async () => {
    const answer = confirm('삭제하시겠습니까?');
    if (!answer) {
      return;
    }
    const file = fileRef ? fileRef : 'no';
    const response = await fetch(`/api/articles?ar=${articleid}&fi=${file}`, {
      method: 'DELETE',
    });
    if (response.status !== 204) {
      alert('죄송합니다. 삭제되지 않았습니다.');
      return;
    }
    router.push('/article/deleted');
  };

  return (
    <s.Delete onClick={click$delete} id="article__delete">
      삭제
    </s.Delete>
  );
}
