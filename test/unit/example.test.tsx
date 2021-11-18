import React from 'react';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { CartApi, ExampleApi } from '../../src/client/api';
import { Catalog } from '../../src/client/pages/Catalog';
import { initStore } from '../../src/client/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { AxiosResponse } from 'axios';
import { ProductShortInfo } from '../../src/common/types';

describe('Simple Test Case', () => {
    it('Should return 4', () => {
        expect(2 + 2).toBe(4);
    });
});

// function mockResponse<T>(data: T): AxiosResponse<T, any> {
//     return {
//         status: 200,
//         statusText: 'OK',
//         headers: {},
//         config: {},
//         data,
//     }
// }

// describe('1', () => {
//     it('В каталоге должны отображаться товары, список которых приходит с сервера', async () => {
//         const api = new ExampleApi('');
//         api.getProducts = () => Promise.resolve<AxiosResponse<ProductShortInfo[]>>(
//             mockResponse([
//                 { id: 123, name: 'a;df', price: 890 },
//                 { id: 124, name: 'sdf', price: 234 },
//             ])
//         );

//         const cart = new CartApi();
//         const store = initStore(api, cart);

//         const component = (
//             <MemoryRouter>
//                 <Provider store={store}>
//                     <Catalog />
//                 </Provider>
//             </MemoryRouter>
//         );

//         const { getByText, container } = render(component);

//         await waitForElementToBeRemoved(() => getByText(`LOADING`));

//         const list = container.querySelectorAll('.ProductItem-Name');
//         const xxx = Array.from(list).map(el => el.textContent);

//         expect(xxx).toEqual(['a;df', 'sdf'])

//         screen.logTestingPlaygroundURL();
//     });
// })