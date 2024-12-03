export const boxStyle = {
    outline: '1px solid black',
    width: '22vw',
    minWidth: '321px',
    minHeight: '432px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '16px',
    position: 'relative',
    cursor: 'pointer',
};

export const cardStyle = {
    minWidth: '280px',
    width: '20vw',
    height: 400,
    padding: '24px',
    boxShadow: '-4px 4px 4px rgba(0, 0, 0, 0.2)',
    margin: '0',
    outline: '1px solid var(--color-lightgray-outline)',
    borderRadius: '8px',
    backgroundColor: 'var(--color-lightgray)',
    filter: 'blur(6px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
};

export const cardHeaderStyle = { fontWeight: '400', margin: '0' };

export const circleStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-lightgreen-button-save)',
    outline: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '16px',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
};

export const headerStyle = {
    fontWeight: '600',
    margin: '0',
};

export const cardContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
};

export const dayDescriptionBoxStyle = {
    outline: '1px solid black',
    borderRadius: '10px',
    height: '10rem',
    textAlign: 'left',
    padding: '0.5rem',
};

export const cardActionsStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
};

export const moreInfoButtonStyle = {
    margin: '0.5rem',
    marginBottom: '0',
    display: 'flex',
    alignItems: 'center',
    outline: '1px solid black',
    borderRadius: '5px',
    backgroundColor: 'var(--color-blue-symbol)',
    cursor: 'pointer',
};

export const moreInfoButtonTextStyle = {
    padding: '6px 8px',
    margin: '0',
    fontWeight: '400',
    textAlign: 'center',
};

export const circleContainerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '2',
};
