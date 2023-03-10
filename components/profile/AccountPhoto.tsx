import { useAuthStore } from 'store/auth';
import { ChangeEvent, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { LoadStatus } from 'components/profile/Account';
import * as s from 'styles/components/AccountPhoto';

export default function ProfilePhoto({ loadStatus }: { loadStatus: LoadStatus }) {
  const { loading, setLoading } = loadStatus;
  const { id: userid, photo, changePhoto } = useAuthStore();
  const userphoto = photo ? photo : '';
  const refInputPhoto = useRef<HTMLInputElement>(null);

  const change$inputPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    if (!e.target.files || !userid) {
      return;
    }
    const file = e.target.files[0];
    const buffer = await file.arrayBuffer();
    const bufferArray = new Uint8Array(buffer);
    const response = await fetch(`/api/user?user=${userid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: null, photo: Array.from(bufferArray) }),
    });
    if (response.status !== 200) {
      alert('죄송합니다. 수정이 되지 않았습니다.');
    } else {
      const { url } = await response.json();
      changePhoto(url);
    }
    setLoading(false);
  };

  const click$changePhoto = () => {
    refInputPhoto.current?.click();
  };

  return (
    <s.Section>
      <s.Container>
        <img src={userphoto} />
        <s.Edit disabled={loading} onClick={click$changePhoto}>
          <FontAwesomeIcon icon={faUpload} />
        </s.Edit>
      </s.Container>
      <input
        type={'file'}
        style={{ display: 'none' }}
        ref={refInputPhoto}
        accept="image/jpeg, image/jpg, image/png"
        onChange={change$inputPhoto}
      />
    </s.Section>
  );
}
