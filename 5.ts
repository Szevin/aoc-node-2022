const fs = require('fs');
const _ = require('lodash');

type Command = {
	amount: number;
	from: number;
	to: number;
};

type Stack = Record<number, Array<string>>;

const defaultStack: Stack = {
	1: ['v', 'n', 'f', 's', 'm', 'p', 'h', 'j'],
	2: ['q', 'd', 'j', 'm', 'l', 'r', 's'],
	3: ['b', 'w', 's', 'c', 'h', 'd', 'q', 'n'],
	4: ['l', 'c', 's', 'r'],
	5: ['b', 'f', 'p', 't', 'v', 'm'],
	6: ['c', 'n', 'q', 'r', 't'],
	7: ['r', 'v', 'g'],
	8: ['r', 'l', 'd', 'p', 's', 'z', 'c'],
	9: ['f', 'b', 'p', 'g', 'v', 'j', 's', 'd'],
};

const commands: Array<Command> = fs
	.readFileSync('5.txt', 'utf-8')
	.trim()
	.split('\n')
	.map((input: string) => ({
		amount: Number(input.split(' ')[1]),
		from: Number(input.split(' ')[3]),
		to: Number(input.split(' ')[5]),
	}));

const a = (stack: Stack, commands: Array<Command>) => {
	console.log('--- A ---');

	commands.forEach((command: Command) => {
		const moveAmount = command.amount <= stack[command.from].length ? command.amount : stack[command.from].length;
		const move = stack[command.from].splice(0, moveAmount);

		stack[command.to] = [..._.reverse(move), ...stack[command.to]];
	});

	console.log(
		Object.values(stack)
			.map((i) => (i.length ? i[0].toUpperCase() : ''))
			.reduce((a, b) => a + b)
	);
};

const b = (stack: Stack, commands: Array<Command>) => {
	console.log('--- B ---');
	console.log(stack);

	commands.forEach((command: Command) => {
		const moveAmount = command.amount <= stack[command.from].length ? command.amount : stack[command.from].length;
		const move = stack[command.from].splice(0, moveAmount);

		stack[command.to] = [...move, ...stack[command.to]];
	});

	console.log(
		Object.values(stack)
			.map((i) => (i.length ? i[0].toUpperCase() : ''))
			.reduce((a, b) => a + b)
	);
};

a({ ...defaultStack }, [...commands]);
b({ ...defaultStack }, [...commands]);
