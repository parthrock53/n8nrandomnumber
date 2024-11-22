import { IExecuteFunctions } from 'n8n-core';
import {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class RandomNumberGenerator implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random Number Generator',
		name: 'randomNumberGenerator',
		group: ['transform'],
		version: 1,
		description: 'Generates a random number between a given range',
		defaults: {
			name: 'Random Number Generator',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Minimum Value',
				name: 'minValue',
				type: 'number',
				default: 0,
				placeholder: 'Enter the minimum value',
				description: 'The minimum value for the random number range.',
			},
			{
				displayName: 'Maximum Value',
				name: 'maxValue',
				type: 'number',
				default: 100,
				placeholder: 'Enter the maximum value',
				description: 'The maximum value for the random number range.',
			},
		],
	};

	async execute(this: IExecuteFunctions) {
		const items = this.getInputData();
		const returnData = [];

		for (let i = 0; i < items.length; i++) {
			const minValue = this.getNodeParameter('minValue', i) as number;
			const maxValue = this.getNodeParameter('maxValue', i) as number;

			if (minValue >= maxValue) {
				throw new Error('Minimum value must be less than the maximum value.');
			}

			// Generate random number
			const randomNumber = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

			returnData.push({
				json: {
					randomNumber,
				},
			});
		}

		return this.prepareOutputData(returnData);
	}
}
