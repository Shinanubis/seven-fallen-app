import Action from './Action';
import Top from './Top';
import Content from './Content';
import Row from './Row';
import './toolbox.css';

function ToolBox({children, isOpen, onClick}) {
    return (
        <div className={isOpen ? "toolbox open" : "toolbox"} onClick={onClick ? onClick : null}>
            {children}
        </div>
    );
}

ToolBox.Top = Top;
ToolBox.Action = Action;
ToolBox.Content = Content;
ToolBox.Row = Row;

export default ToolBox;