import { useContext, useState } from "react";
import { GlobalContext } from "../context/ShipContext";
import { type Character } from "../types/character";
import CharacterCard from "../components/CharacterCard";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Dashboard() {
  const context = useContext(GlobalContext);

  if (!context) return null;

  const { fuel, credit, characters, refuelTank } = context;

  const {} = useState<number>();

  return (
    <>
      <div className="dashboard-bg">
        <div className="container pt-4">
          <h1 className="titulo-dashboard">🚀 Puente de Mando</h1>
          {fuel <= 0 && (
            <div className="alert-gameover">
              🚨 Game Over: ¡La nave se ha quedado sin combustible!
            </div>
          )}

          <div className="div-general">
            {characters.length === 0 ? (
              <div className="alert alert-danger text-center" role="alert">
                <Link to="/hirecrew" className="alert-link">
                  🚨 ¡La nave no tiene tripulantes! Contrátalos en la Cantina.
                </Link>
              </div>
            ) : (
              characters.map((character: Character) => (
                <CharacterCard key={character.id} character={character} />
              ))
            )}
          </div>

          <div className="resource-card">
            <h3 className="resource-title">Recursos de la Nave</h3>
            <div className="resource-stats">
              <div className="resource-item credit">
                💰 Créditos: <span>{credit}</span>
              </div>
              <div className="resource-item fuel">
                ⛽ Combustible: <span>{fuel}%</span>
                <br />
                {/* Cuando se pulse el llenar tanque se llenara en base a los creditos disponibles (50 credits = 10%) */}
                {credit != 0 ? (
                  <Button text="Llenar" onClick={refuelTank}></Button>
                ) : (
                  <Button
                    text="Eres un tieso"
                    onClick={refuelTank}
                    disabled={true}
                  ></Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
