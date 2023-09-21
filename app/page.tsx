'use client';

import ModalToping from '@/components/modal-toping';
import { Pizza, PizzaCart, Toping } from '@/type';
import Image from 'next/image';
import { useState } from 'react';
import { pizzas, topings as topingItem } from '@/constants';

export default function Home() {
	const [cart, setCart] = useState<PizzaCart[]>([]);
	const [topings, setTopings] = useState<Toping[]>([]);
	const [modalToping, setModalToping] = useState(false);
	const [selectPizza, setSelectPizza] = useState<Pizza>();
	const [isActive, setIsActive] = useState(false);

	const addPizza = (pizza: Pizza) => {
		setModalToping(true);
		setSelectPizza(pizza);
	};

	const addTopping = (event: React.ChangeEvent<HTMLInputElement>) => {
		const id = parseInt(event.target.value);

		const selectedToping = topingItem.find((item) => item.id === id);

		if (event.target.checked && selectedToping) {
			setTopings((prev) => [...prev, selectedToping]);
		} else {
			setTopings((prev) => prev.filter((item) => item.id !== id));
		}
	};

	const addToCart = () => {
		if (!selectPizza) {
			throw new Error('Pizza Tidak ditemukan');
		}

		const pizza: PizzaCart = {
			id: Date.now(),
			pizza: selectPizza,
			toping: topings.length > 0 ? topings.map((toping) => toping.name).join(', ') : 'No topings',
			total: (selectPizza?.price ?? 0) + topings.reduce((acc, toping) => acc + toping.price, 0),
		};

		setCart((prevCart) => [...prevCart, pizza]);
		setModalToping(false);
		setTopings([]);
	};

	const deletePizza = (id: number) => {
		setCart((prev) => prev.filter((pizza) => pizza.id !== id));
	};

	return (
		<main className='container'>
			<section className='pizza-section'>
				<div className='logo-container'>
					<h1 className='pizza-title'>Pizza List</h1>
					<button onClick={() => setIsActive(true)}>
						<img src='/assets/cart.png' alt='' />
						<div>{cart.length}</div>
					</button>
				</div>
				<div className='pizza-container'>
					{pizzas.map((pizza) => (
						<div key={pizza.id} className='pizza-card' role='button' onClick={() => addPizza(pizza)}>
							<div className='pizza-img'>
								<Image src={pizza.img} priority alt='Pizza' fill />
							</div>
							<div className='pizza-desc'>{pizza.name}</div>
							<div className='pizza-price'>${pizza.price}</div>
						</div>
					))}
				</div>
			</section>

			<section className={`cart-section ${isActive && 'active'}`}>
				<div className='cart-logo'>
					<h1 className='cart-title'>Cart</h1>
					<button onClick={() => setIsActive(false)}>Close</button>
				</div>
				<div className='cart-container'>
					{cart.length > 0 ? (
						cart.map((item) => (
							<div className='cart-item' key={item.id}>
								<div className='cart-img'>
									<Image src={item.pizza?.img} fill alt={item.pizza.name} priority />
								</div>
								<div className='cart-text'>
									<div className='cart-name'>{item.pizza?.name}</div>
									<div className='toping'>{item.toping}</div>
									<div className='cart-price'>${item.total}</div>
								</div>
								<button onClick={() => deletePizza(item.id)}>X</button>
							</div>
						))
					) : (
						<div className='no-item'>The shoping cart is still empty, click item to add cart</div>
					)}
				</div>
				<div className='cart-total'>
					<div className='card-total-group'>
						<div>Total</div>
						<div>${cart.reduce((acc, pizza) => acc + pizza.total, 0)}</div>
					</div>
				</div>
			</section>

			{modalToping && <ModalToping addToping={addTopping} addToCart={addToCart} setModalToping={setModalToping} setTopings={setTopings} />}
		</main>
	);
}
