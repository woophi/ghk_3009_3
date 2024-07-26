import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: 'calc(100% - 40px)',
  padding: '20px',
  bottom: 0,
  backgroundColor: '#030306',
  borderRadius: '36px 36px 0px 0px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

const container = style({
  display: 'flex',
  padding: '21px',
  alignItems: 'center',
  gap: '16px',
  backgroundColor: '#000000',
  color: '#FFFFFFF0',
});

const imgBg = recipe({
  base: {
    width: '100%',
  },
  variants: {
    isEmpty: {
      true: {
        position: 'fixed',
        left: 0,
        top: '115px',
      },
    },
  },
});

const selectItem = style({
  borderRadius: '10px',
  padding: '12px',
  backgroundColor: '#E7E7F82E',
  color: '#FFFFFFF0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
});

export const appSt = {
  bottomBtn,
  container,
  imgBg,
  selectItem,
};
