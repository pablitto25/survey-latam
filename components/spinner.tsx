import { Button } from "@nextui-org/react";


export default function Spinner() {

    
    

    return (
        <>
           <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <style jsx>{`
            @keyframes spinner {
              0%, 50% {
                animation-timing-function: cubic-bezier(0.27, 0.42, 0.37, 0.99);
                r: 0;
              }
              25% {
                animation-timing-function: cubic-bezier(0.53, 0, 0.61, 0.73);
                r: 2px;
              }
            }
            .spinner {
              animation: spinner 1.2s infinite;
            }
            .delay1 { animation-delay: 0.1s; }
            .delay2 { animation-delay: 0.2s; }
            .delay3 { animation-delay: 0.3s; }
            .delay4 { animation-delay: 0.4s; }
            .delay5 { animation-delay: 0.5s; }
            .delay6 { animation-delay: 0.6s; }
            .delay7 { animation-delay: 0.7s; }
            .delay8 { animation-delay: 0.8s; }
            .delay9 { animation-delay: 0.9s; }
            .delay10 { animation-delay: 1s; }
            .delay11 { animation-delay: 1.1s; }
          `}</style>
            <circle className="spinner" cx="12" cy="3" r="0" />
            <circle className="spinner delay1" cx="16.50" cy="4.21" r="0" />
            <circle className="spinner delay11" cx="7.50" cy="4.21" r="0" />
            <circle className="spinner delay2" cx="19.79" cy="7.50" r="0" />
            <circle className="spinner delay10" cx="4.21" cy="7.50" r="0" />
            <circle className="spinner delay3" cx="21.00" cy="12.00" r="0" />
            <circle className="spinner delay9" cx="3.00" cy="12.00" r="0" />
            <circle className="spinner delay4" cx="19.79" cy="16.50" r="0" />
            <circle className="spinner delay8" cx="4.21" cy="16.50" r="0" />
            <circle className="spinner delay5" cx="16.50" cy="19.79" r="0" />
            <circle className="spinner delay7" cx="7.50" cy="19.79" r="0" />
            <circle className="spinner delay6" cx="12" cy="21" r="0" />
        </svg>
        </>
    );
}