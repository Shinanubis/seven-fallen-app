import Layout from '../layouts/Layout';
import Return from '../components/Return'


const EmptyDecksList = (props) => {

    return (
            <Layout>
                <div className="deck__list">
                    <p className="deck__list--empty">{props.text}</p>
                </div>
                <Return />
            </Layout>
    )
}



export default EmptyDecksList;
