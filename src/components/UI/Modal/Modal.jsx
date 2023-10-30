import classes from './Modal.module.scss';

const Modal = ({ modalValue, setModalValue, color, children }) => {
    return (
        <div className={`${classes.window} ${modalValue && classes.active}`}>
            <div className={classes.container} style={{backgroundColor:color}}>
                <div className={classes.content}>
                    {children}
                </div>
                <button className={classes.exit} onClick={()=>setModalValue(false)}>×</button>
            </div>
        </div>
    );
};

export default Modal;