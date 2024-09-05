import { Image } from 'primereact/image';
import p0 from '../../assets/imgs/comousar/p0.png';
import p1 from '../../assets/imgs/comousar/p1.png';
import p2 from '../../assets/imgs/comousar/p2.png';

import './style.css'

export default function ComoUsar( {isSection }) {
    return(
        <div className="section-como-usar flex flex-column">
            {isSection && <h2 className='fundo-desfocado-2 p-3'>COMO USAR</h2>}
            <div className="fundo-desfocado-2 flex flex-row align-items-center justify-content-around mt-3 p-3">
                <div>
                    <Image src={p0} alt="passo-1" width="250" />
                </div>
                <div>
                <h2>Para usar o sistema, comece criando uma sala no site, inserindo seu nome. 
                Em seguida, compartilhe o link gerado no grupo de conversa com as pessoas a qual você deseja se reunir. 
                Os participantes podem acessar o link e votar nos horários que estão disponíveis. 
                O sistema exibirá os horários mais votados, ajudando a identificar a melhor opção para todos.</h2>
                </div>
            </div>

            <div className="fundo-desfocado-2 flex flex-row align-items-center justify-content-around mt-3 p-3">
                <div>
                <h2>
                    Insira seu nome, o título da reunião <br/> e uma descrição se desejar!
                </h2>  
                </div>
                <div>
                    <Image src={p1} alt="passo-2" width="250" />
                </div>
            </div>
            
            <div className="fundo-desfocado-2 flex flex-row align-items-center justify-content-around mt-3 p-3">
                <div>
                    <Image src={p2} alt="passo-2" width="250" />
                </div>
                <div>
                    <h2>No calendário, escolha todos os dias que deseja adicionar
                    <br/>opções de horário.</h2>  
                </div>
            </div>
        </div>
    );
}