import DevPic from "../../../Assets/Images/About/DevPic.jpg";
import "./AboutUs.css";

function AboutUs(): JSX.Element {
    return (
        <div className="AboutUs">
            <article>
                <section>
                    <p>My name is Nadav Barmatz and I am a Full-Stack developer.</p>
                    <p>Formerly I was a musician/Sound engineer.</p> 
                    <p>When the Covid-19 started to spread and the coltural section took the hit, I decided to do career retraining and become a web developer.</p>
                    <p>I took a professional course in John Bryce Haifa / Israel, and made sure that I will get the best out of it.</p>
                    <p>The course took place over 10 months, and i got to learn massive amount of developing technologies,<br />both within the class framework and by myself on the spare time.</p> 
                </section>
                <section>
                    <p>For the past year and a half, I was dedicated to progress as a web developer and keep challenging my self.</p>
                    <p>I took on (and keep on taking) as many projects as I can focusing on functionality, technologies and learning as much as i can.</p>
                    <p>I am colaborating with a very talnted graphic designer, Gefen Ben David (<a target="_blank" href="https://www.gefenbd.com/">Link to her portfolio</a>).</p>
                </section>
                <section>
                    <p>My stack is MERN/MEAN</p>
                    <p>This webApp was made with:</p>
                    <ul>
                        <li>React TypeScript, MobX and Axios in Frontend.</li>
                        <li>NodeJS and Express in Backend.</li>
                        <li>MySQL DataBase.</li>
                    </ul>
                    <a target="_blank" href="https://github.com/NadavBarmatz/My-Kanban">Link to Github repository</a>
                </section>
            </article>
            <div className="picture">
                <img src={DevPic} alt="developer picture" />
            </div>
        </div>
    );
}

export default AboutUs;
