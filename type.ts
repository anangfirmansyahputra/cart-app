export interface Pizza {
	id: number;
	name: string;
	price: number;
	img: string;
}

export interface PizzaCart {
	id: number;
	pizza: Pizza;
	total: number;
	toping: string;
}

export interface Toping {
	id: number;
	name: string;
	price: number;
}
