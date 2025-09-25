using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NearsureApp.Application.Features.Products.Commands.CreateProduct;
using NearsureApp.Application.Features.Products.Commands.UpdateProduct;
using NearsureApp.Application.Features.Products.Commands.DeleteProduct;

using NearsureApp.Application.Features.Products.Queries.GetProducts;
using NearsureApp.Domain.Entities;

namespace NearsureApp.Api.Controllers;

[Authorize]
public class ProductsController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Product>>> Get()
    {
        return await Mediator.Send(new GetProductsQuery());
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> Create(CreateProductCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(Guid id, UpdateProductCommand command)
    {
        if (id != command.Id)
        {
            return BadRequest();
        }

        await Mediator.Send(command);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        await Mediator.Send(new DeleteProductCommand { Id = id });

        return NoContent();
    }
}
