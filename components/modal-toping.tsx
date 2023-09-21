import { topings } from '@/constants';
import { Pizza, PizzaCart, Toping } from '@/type';

interface ModalToppingProps {
	addToping: (event: React.ChangeEvent<HTMLInputElement>) => void;
	addToCart: () => void;
	setModalToping: (modalToping: boolean) => void;
	setTopings: (toping: Toping[]) => void;
}

const ModalToping: React.FC<ModalToppingProps> = ({ addToping, addToCart, setModalToping, setTopings }) => {
	const handleClose = () => {
		setModalToping(false);
		setTopings([]);
	};

	return (
		<div className='modal-container'>
			<div className='toping-container'>
				<div className='toping-title'>Topings</div>
				<div className='toping-wrapper'>
					{topings.map((toping) => (
						<div key={toping.id}>
							<input id={toping.name} type='checkbox' value={toping.id} onChange={addToping} />
							<label htmlFor={toping.name}>
								{toping.name} (${toping.price})
							</label>
						</div>
					))}
				</div>
				<div>
					<button className='btn-cart' onClick={addToCart}>
						Add to cart
					</button>
				</div>
				<button className='close-modal' onClick={handleClose}>
					X
				</button>
			</div>
		</div>
	);
};

export default ModalToping;
