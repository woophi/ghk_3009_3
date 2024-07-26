import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { Typography } from '@alfalab/core-components/typography';
import Lottie from 'lottie-react';
import { useCallback, useState } from 'react';
import current from './assets/current.png';
import empty from './assets/empty.png';
import lesscolors from './assets/lesscolors.png';
import min from './assets/min.png';
import noimgs from './assets/noimgs.png';
import scrollAnimation from './assets/scroll.json';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { sendDataToGA } from './utils/events';

const vars = [
  {
    title: 'Не выбрано',
    img: empty,
  },
  {
    title: 'Текущий вариант',
    img: current,
  },
  {
    title: 'Приглушили цвета',
    img: lesscolors,
  },
  {
    title: 'Без картинок',
    img: noimgs,
  },
  {
    title: 'Минималистичный',
    img: min,
  },
];

export const App = () => {
  const [selectedVariant, setSelectedVariant] = useState(vars[0]);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState('');
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [openAllVars, setOpenAllVars] = useState(false);

  const isEmpty = selectedVariant.title === vars[0].title;

  const submit = useCallback(() => {
    if (isEmpty) {
      setError('Выберите вариант оформления главного экрана');
      return;
    }
    setLoading(true);
    sendDataToGA(selectedVariant.title).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  }, [selectedVariant, isEmpty]);

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <Typography.TitleResponsive tag="h1" view="xsmall" font="system" weight="medium">
          Скрольте и выберите вариант оформления экрана
        </Typography.TitleResponsive>
        <Lottie animationData={scrollAnimation} loop width={50} height={50} />
      </div>
      <img src={selectedVariant.img} className={appSt.imgBg({ isEmpty })} />
      <div style={{ height: '170px' }} />
      <div className={appSt.bottomBtn}>
        {openAllVars ? (
          vars.map(v => (
            <div
              className={appSt.selectItem}
              key={v.title}
              onClick={() => {
                setError('');
                setSelectedVariant(v);
                setOpenAllVars(false);
              }}
            >
              <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
                {v.title}
              </Typography.Text>
              {v === selectedVariant ? <CDNIcon name="glyph_checkmark_m" /> : null}
            </div>
          ))
        ) : (
          <>
            <div className={appSt.selectItem} onClick={loading ? undefined : () => setOpenAllVars(true)}>
              <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
                {selectedVariant.title}
              </Typography.Text>
              <CDNIcon name="glyph_chevron-down_m" />
            </div>
            <ButtonMobile loading={loading} onClick={submit} block view="primary" size="l" colors="inverted" hint={err}>
              Выбрать
            </ButtonMobile>
          </>
        )}
      </div>
    </>
  );
};
