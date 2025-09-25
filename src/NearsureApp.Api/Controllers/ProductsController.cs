using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NearsureApp.Application.Features.Products.Commands.CreateProduct;

namespace NearsureApp.Api.Controllers;

[Authorize]
public class ProductsController : ApiControllerBase
{
    [HttpPost]
    public async Task<ActionResult<Guid>> Create(CreateProductCommand command)
    {
        return await Mediator.Send(command);
    }
}
