import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Thankyou = () => {
    const navigate = useNavigate();
    return (
        <div className="thank-you container text-center">
             <Result
                status="success"
                title="Your Response Is Successfully Registered!"
                subTitle="If you want to create survey like this go to surveyAgency.com"
            />
            <Button onClick={() => navigate(-1)}>Reload</Button>
        </div>
    )
}

export default Thankyou;