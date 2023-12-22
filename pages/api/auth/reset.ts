// NextJS API route support: https://nextjs.org/docs/api-routes/introduction
// GET read query string ?stytch_token_type=reset_password&token=s2w48a7OK_cUNgCuo-vIqKbs2LAIE4-lN21rBZYzNtiK
// Return JSON object of { stytch_token_type: 'reset_password', token: 's2w48a7OK_cUNgCuo-vIqKbs2LAIE4-lN21rBZYzNtiK' }

import { NextApiRequest, NextApiResponse } from 'next';

export default async function reset(req: NextApiRequest, res: NextApiResponse) {
  console.log('\n\n\n', ['auth/reset'], '\n', req.query);
  let { stytch_token_type, token } = req.query;
  // if (stytch_token_type === 'reset_password' && token) {
  //   // let data = await stytchApi('/passwords/reset', {
  //   //   token: token,
  //   //   new_password: 'demo',
  //   // });
  //   console.log('stytch data', data);
  //   return res.status(200).json(data);
  // }
  res.status(200).json({ stytch_token_type, token });
}
