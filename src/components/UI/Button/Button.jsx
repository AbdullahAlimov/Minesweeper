import classes from './Button.module.scss'

const Button = ({children,size, onClick}) => {
    return (
        <button className={classes.button} onClick={onClick} style={{width:size,height:size}}>
            <div className={classes.content} style={{width:size-10,height:size-10}}>
            {children}
            </div>
        </button>
    );
};

export default Button;