import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'folder/Home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'update-cliente',
    loadChildren: () => import('./pages/update-cliente/update-cliente.module').then( m => m.UpdateClientePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'factura',
    loadChildren: () => import('./pages/factura/factura.module').then( m => m.FacturaPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./pages/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'listarproductos',
    loadChildren: () => import('./pages/listarproductos/listarproductos.module').then( m => m.ListarproductosPageModule)
  },
  {
    path: 'agregar-producto',
    loadChildren: () => import('./pages/agregar-producto/agregar-producto.module').then(m => m.AgregarProductoPageModule)
  },
  {
    path: 'update-productos',
    loadChildren: () => import('./pages/update-productos/update-productos.module').then(m => m.UpdateProductosPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'modal-factura',
    loadChildren: () => import('./pages/modal-factura/modal-factura.module').then( m => m.ModalFacturaPageModule)
  },
  {
    path: 'modal-producto',
    loadChildren: () => import('./pages/modal-producto/modal-producto.module').then( m => m.ModalProductoPageModule)
  },
  {
    path: 'clientehome',
    loadChildren: () => import('./pages/clientehome/clientehome.module').then( m => m.ClientehomePageModule)
  },
  {
    path: 'detalleproducto',
    loadChildren: () => import('./pages/detalleproducto/detalleproducto.module').then( m => m.DetalleproductoPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pages/pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'pedidos-admin',
    loadChildren: () => import('./pages/pedidos-admin/pedidos-admin.module').then( m => m.PedidosAdminPageModule)
  },  {
    path: 'terminos',
    loadChildren: () => import('./pages/terminos/terminos.module').then( m => m.TerminosPageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
