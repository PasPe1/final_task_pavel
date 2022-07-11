import classes from './aboutUs.module.scss';

const AboutUs = () => {
    return (
        <div className={classes.about_us}>
            <h1>LANIF</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br/> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br/> Urna molestie at elementum eu facilisis sed odio.<br/> Penatibus et magnis dis parturient montes nascetur ridiculus mus.<br/> Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis.<br/> Ipsum suspendisse ultrices gravida dictum fusce.</p>
            <img src='https://www.queensland.com/au/en/plan-your-holiday/news-and-articles/how-tos/how-to-photograph-sunrise/_jcr_content/root/responsivegrid/imagec1da0241-525a-415d-b889-40fd04215fc3.coreimg.jpeg/1591929024296/2016-qld-queensland-photography.jpeg?fit=wrap&fmt=webp&qlt=40&wid=1200' alt='sunrise in ocean'/>
        </div>
    )
}

export default AboutUs;