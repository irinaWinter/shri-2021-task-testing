import React from 'react';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { CartApi, ExampleApi } from '../../src/client/api';
import { Catalog } from '../../src/client/pages/Catalog';
import { Cart } from '../../src/client/pages/Cart';
import { Contacts } from '../../src/client/pages/Contacts';
import { Delivery } from '../../src/client/pages/Delivery';
import { Home } from '../../src/client/pages/Home';
import { Product } from '../../src/client/pages/Product';
import { initStore } from '../../src/client/store';
import { Provider } from 'react-redux';
import { MemoryRouter, Router } from 'react-router';
import { AxiosResponse } from 'axios';
import { ProductShortInfo } from '../../src/common/types';
import { createMemoryHistory } from 'history';

function mockResponse<T>(data: T): AxiosResponse<T, any> {
    return {
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        data,
    }
}

export const STUB_DATA = { n: 1 };
export function getStubData() {
    return { n: 1 };
}

const defaultHistory = createMemoryHistory({
    initialEntries: ['/'],
    initialIndex: 0
});

async function renderPage(products: ProductShortInfo[], page: any = null, history: any = defaultHistory): Promise<Element> {
    const api = new ExampleApi('');
    api.getProducts = () => Promise.resolve<AxiosResponse<ProductShortInfo[]>>(
        mockResponse(products)
    );

    const cart = new CartApi();
    const store = initStore(api, cart);

    const component = (
        <Router history={history}>
            <Provider store={store}>
                {page || <Catalog />}
            </Provider>
        </Router>
    );

    const { getByText, container } = render(component);

    if (document.querySelector('h1').textContent === "Catalog") {
        await waitForElementToBeRemoved(() => getByText(`LOADING`));
    }

    return container;
}

function getProductShortInfo(data: Partial<ProductShortInfo>): ProductShortInfo {
    return {
        id: 1,
        name: 'test name',
        price: 100,
        ...data
    }
}

describe('Simple Test Case', () => {
    it('Should return 4', () => {
        expect(2 + 2).toBe(4);
    });
});

describe('1', () => {
    it('В каталоге должны отображаться товары, список которых приходит с сервера', async () => {
        const container = await renderPage([
            getProductShortInfo({ name: 'qqq' }),
            getProductShortInfo({ name: 'eee' }),
        ]);

        const list = container.querySelectorAll('.ProductItem-Name');
        const xxx = Array.from(list).map(el => el.textContent);

        expect(xxx).toEqual(['qqq', 'eee'])

        screen.logTestingPlaygroundURL();
    });

    it('Для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', async () => {
        const container = await renderPage([
            { id: 123, name: 'qqq', price: 999 }
        ]);

        const item = container.querySelector('.ProductItem');

        expect(item.querySelector('.ProductItem-Name').textContent).toEqual('qqq');
        expect(item.querySelector('.ProductItem-Price').textContent).toEqual('$999');
    })
})

describe('Страницы', () => {
    it('по адресу /cart должна открываться страница "Shopping cart"', async () => {
        const history = createMemoryHistory({
            initialEntries: ['/cart'],
            initialIndex: 0
        });

        const container = await renderPage([
            getProductShortInfo({ name: 'qqq' }),
            getProductShortInfo({ name: 'eee' }),
        ], <Cart />, history);

        const pageTitle = container.querySelector('h1');

        expect(pageTitle.textContent).toEqual('Shopping cart');
    });

    it('по адресу /catalog должна открываться страница "Catalog"', async () => {
        const history = createMemoryHistory({
            initialEntries: ['/catalog'],
            initialIndex: 0
        });

        const container = await renderPage([
            { id: 123, name: 'qqq', price: 999 }
        ], <Catalog />, history);

        const pageTitle = container.querySelector('h1');

        expect(pageTitle.textContent).toEqual('Catalog');
    });

    it('по адресу /contacts должна открываться страница "Contacts"', async () => {
        const history = createMemoryHistory({
            initialEntries: ['/contacts'],
            initialIndex: 0
        });

        const container = await renderPage([
            { id: 123, name: 'qqq', price: 999 }
        ],
            <Contacts />, history);

        const pageTitle = container.querySelector('h1');

        expect(pageTitle.textContent).toEqual('Contacts');
    });

    it('по адресу /delivery должна открываться страница "Delivery"', async () => {
        const history = createMemoryHistory({
            initialEntries: ['/delivery'],
            initialIndex: 0
        });

        const container = await renderPage([
            { id: 123, name: 'qqq', price: 999 }
        ],
            <Delivery />, history);

        const pageTitle = container.querySelector('h1');

        expect(pageTitle.textContent).toEqual('Delivery');
    });

    it('по адресу / должна открываться страница "Home Page"', async () => {
        const history = createMemoryHistory({
            initialEntries: ['/'],
            initialIndex: 0
        });

        const container = await renderPage([
            { id: 123, name: 'qqq', price: 999 }
        ],
            <Home />, history);

        const pageTitle = container.querySelector('.display-3');

        expect(pageTitle.textContent).toEqual('Welcome to Example store!');
    });

    // it('по адресу /catalog/1 должна открываться страница "Product Details"', async () => {
    //     const history = createMemoryHistory({
    //         initialEntries: ['/catalog/0'],
    //         initialIndex: 0
    //     });

    //     const container = await renderPage([
    //         { id: 0, name: 'Product Details', price: 999 }
    //     ],
    //         <Product />, history);

    //     const pageTitle = container.querySelector('h1');

    //     expect(pageTitle.textContent).toEqual('Fantastic Towels');
    // });
});
