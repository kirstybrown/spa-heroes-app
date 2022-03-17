import { Link } from "react-router-dom";
import { heroImages } from "../../helpers/heroImages";


export const HeroCard = ({ 
    superhero,
    id,
    publisher,
    alter_ego,
    first_appearance,
    characters
 }) => {

    const imagePath = `${process.env.PUBLIC_URL}/assets/heroes/${id}.jpg`

  return (
    <div className="col animate__animated animate__fadeIn">
        <div className="card">
            
            <div className="row no-gutters">
                <div className="col-4">
                    <img src={heroImages(`./${ id }.jpg`)} className="card-img-top" alt={superhero} />

                </div>
                <div className="col-8">
                    <h5 className="card-title">{superhero}</h5>
                    <p className="card-text">{alter_ego}</p>

                    {
                        ( alter_ego !== characters ) &&
                            <p className="text-muted">{ characters }</p>
                    }

                    <p className="card-text">
                        <small className="text-muted">{ first_appearance}</small>
                    </p>

                    <Link to={`/hero/${id}`}>
                        More info...
                    </Link>
                </div>
            </div>

        </div>
    </div>

  )
}
